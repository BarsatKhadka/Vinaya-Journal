import { useState, useEffect, useRef } from "react";
import { useAppStore } from "../../../../../store";
import { Sparkles, ChevronDown, X } from "lucide-react";
import VinayaOllamaAIBackground from "../../../../../assets/BackgroundImages/VinayaOllamaAIBackground.png";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "vinaya-reflection-text";
const STORAGE_DAYS_KEY = "vinaya-reflection-days";

export const Reflection = () => {
    const { t, i18n } = useTranslation();
    const { currentModel } = useAppStore();

    const [days, setDays] = useState<number>(() => {
        const saved = sessionStorage.getItem(STORAGE_DAYS_KEY);
        return saved ? Number(saved) : 7;
    });
    const [reflection, setReflection] = useState<string>(() => sessionStorage.getItem(STORAGE_KEY) || "");
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const outputRef = useRef<HTMLDivElement | null>(null);

    const periods = [
        { label: t("reflection.period.lastWeek"), value: 7 },
        { label: t("reflection.period.last2Weeks"), value: 14 },
        { label: t("reflection.period.lastMonth"), value: 30 },
    ];

    // Persist the last reflection + period so switching sidebar panels doesn't lose it.
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, reflection);
    }, [reflection]);

    useEffect(() => {
        sessionStorage.setItem(STORAGE_DAYS_KEY, String(days));
    }, [days]);

    // Keep the output scrolled to the latest streamed text.
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [reflection]);

    const handleGenerate = async () => {
        const controller = new AbortController();
        setAbortController(controller);
        setIsLoading(true);
        setReflection("");

        let text = "";
        try {
            const params = new URLSearchParams({
                last_n_days: String(days),
                language: i18n.language,
            });
            if (currentModel) params.set("model_name", currentModel);

            const response = await fetch(`http://localhost:8000/reflection?${params.toString()}`, {
                method: "GET",
                headers: { Accept: "text/event-stream" },
                signal: controller.signal,
            });

            const reader = response.body?.getReader();
            if (!reader) throw new Error("No response body");
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                text += decoder.decode(value, { stream: true });
                setReflection(text);
            }
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                setReflection((prev) => (prev ? `${prev}\n\n${t("reflection.stopped")}` : t("reflection.stopped")));
            } else {
                console.error("Reflection error:", error);
                setReflection(t("reflection.error"));
            }
        } finally {
            setIsLoading(false);
            setAbortController(null);
        }
    };

    const handleStop = () => {
        if (abortController) {
            abortController.abort();
        }
    };

    const hasReflection = reflection.trim().length > 0;

    return (
        <div className="flex flex-col h-full relative text-[var(--text-main)]">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${VinayaOllamaAIBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "var(--image-filter)",
                }}
            />
            <div className="absolute inset-0 bg-[var(--bg-main)]/50 pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col h-full p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                        <h2 className="text-xl md:text-2xl font-semibold font-serif text-[var(--text-main)] flex items-center gap-2">
                            <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                            {t("reflection.title")}
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] font-serif mt-1">
                            {t("reflection.subtitle")}
                        </p>
                    </div>
                    <div className="relative flex-shrink-0">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--accent)] text-[var(--text-on-accent)] font-serif hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {periods.find((p) => p.value === days)?.label}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-1 w-44 bg-[var(--bg-card)] rounded-md shadow-lg border border-[var(--border-color)] z-20">
                                {periods.map((p) => (
                                    <button
                                        key={p.value}
                                        onClick={() => {
                                            setDays(p.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 font-serif text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors ${
                                            days === p.value ? "bg-[var(--hover-bg)]" : ""
                                        }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    ref={outputRef}
                    className="flex-1 overflow-y-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]/70 p-6 mb-4"
                    style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.05)" }}
                >
                    {hasReflection ? (
                        <p className="text-base whitespace-pre-wrap font-serif leading-relaxed text-[var(--text-main)]">
                            {reflection}
                        </p>
                    ) : isLoading ? (
                        <div className="flex space-x-2 items-center h-8">
                            <div className="w-2 h-2 bg-[var(--text-main)] rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-[var(--text-main)] rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-[var(--text-main)] rounded-full animate-bounce delay-200" />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center select-none">
                            <h3 className="text-lg md:text-xl font-semibold mb-2 text-[var(--text-main)] font-serif">
                                {t("reflection.emptyTitle")}
                            </h3>
                            <p className="text-base text-[var(--text-muted)] font-serif">
                                {t("reflection.emptySubtitle")}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    {isLoading ? (
                        <button
                            onClick={handleStop}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--text-on-accent)] font-serif hover:opacity-90 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            {t("reflection.stop")}
                        </button>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--text-on-accent)] font-serif hover:opacity-90 transition-colors"
                        >
                            <Sparkles className="w-4 h-4" />
                            {hasReflection ? t("reflection.regenerate") : t("reflection.generate")}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
