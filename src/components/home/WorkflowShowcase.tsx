"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

import callSheetsAnimation from "@/lottie/call-sheets.json";
import locationsMapAnimation from "@/lottie/locations-map.json";
import shootPlanAnimation from "@/lottie/shoot-plan.json";
import type { Photo } from "@/lib/types";

type ShowcaseId = "shoot" | "call-sheets" | "locations";

interface ShowcaseItem {
    id: ShowcaseId;
    tabLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    accent: string;
    icon: "shoot" | "call-sheets" | "locations";
    badgeTone: "mint" | "sky" | "leaf";
    steps: string[];
}

const ITEMS: ShowcaseItem[] = [
    {
        id: "shoot",
        tabLabel: "Shoot",
        eyebrow: "SHOOT",
        title: "Plan your travel shoot in one calm flow",
        description:
            "Build a visual itinerary, lock your daily checkpoints, and keep your map plan synced before you hit the road.",
        ctaLabel: "Plan Shoot",
        ctaHref: "/templates",
        accent: "from-coral-400 via-coral-500 to-cocoa-600",
        icon: "shoot",
        badgeTone: "mint",
        steps: ["Pick a template", "Adjust days", "Save your route"],
    },
    {
        id: "call-sheets",
        tabLabel: "Call Sheets",
        eyebrow: "CALL SHEETS",
        title: "Share day plans with your travel crew",
        description:
            "Turn your itinerary into a clean daily brief so everyone sees meetup times, neighborhoods, and backup options.",
        ctaLabel: "Open Day Plans",
        ctaHref: "/templates",
        accent: "from-emerald-400 via-emerald-500 to-teal-600",
        icon: "call-sheets",
        badgeTone: "leaf",
        steps: ["Create day sheet", "Share details", "Track updates"],
    },
    {
        id: "locations",
        tabLabel: "Locations",
        eyebrow: "LOCATIONS",
        title: "Map out your locations",
        description:
            "Organize place details that sync with your routes, schedules, and budget notes while keeping everything easy to scan.",
        ctaLabel: "Explore Locations",
        ctaHref: "/cities",
        accent: "from-sky-400 via-cyan-500 to-blue-600",
        icon: "locations",
        badgeTone: "sky",
        steps: ["Add places", "Edit details", "Share with friends"],
    },
];

function IconBadge({
    icon,
    tone,
    active,
}: {
    icon: ShowcaseItem["icon"];
    tone: ShowcaseItem["badgeTone"];
    active: boolean;
}) {
    const toneClass =
        tone === "mint"
            ? active
                ? "bg-white/20 text-white"
                : "bg-emerald-50 text-emerald-600"
            : tone === "sky"
                ? active
                    ? "bg-white/20 text-white"
                    : "bg-cyan-50 text-cyan-600"
                : active
                    ? "bg-white/20 text-white"
                    : "bg-lime-50 text-lime-600";

    return (
        <span
            className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-black/5 ${toneClass}`}
            aria-hidden="true"
        >
            {icon === "shoot" ? (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 17l6-6 3 3 7-7" />
                    <path d="M14 7h6v6" />
                </svg>
            ) : icon === "call-sheets" ? (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="14" height="14" rx="2" />
                    <path d="M7 2v4M13 2v4M6 9h8" />
                    <circle cx="18" cy="17" r="3" />
                    <path d="M18 15.5v1.6l1 0.7" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.2" />
                </svg>
            )}
        </span>
    );
}

function Illustration({
    accent,
    animationData,
    animationSpeed,
    inView,
    photo,
}: {
    accent: string;
    animationData: object;
    animationSpeed: number;
    inView: boolean;
    photo?: Photo | null;
}) {
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);
    const [supportsHover, setSupportsHover] = useState(false);
    const [tiltState, setTiltState] = useState({ rotateX: 0, rotateY: 0, parallaxX: 0, parallaxY: 0 });

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

        const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        const updateHoverSupport = (event?: MediaQueryListEvent) => {
            setSupportsHover(event ? event.matches : mediaQuery.matches);
        };

        updateHoverSupport();
        mediaQuery.addEventListener("change", updateHoverSupport);
        return () => mediaQuery.removeEventListener("change", updateHoverSupport);
    }, []);

    useEffect(() => {
        lottieRef.current?.setSpeed(animationSpeed);
    }, [animationSpeed]);

    useEffect(() => {
        if (inView) {
            lottieRef.current?.play();
            return;
        }
        lottieRef.current?.pause();
    }, [inView]);

    const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!supportsHover) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        setTiltState({
            rotateX: -(y * 5),
            rotateY: x * 5,
            parallaxX: x * 12,
            parallaxY: y * 12,
        });
    };

    const resetTilt = () => {
        setTiltState({ rotateX: 0, rotateY: 0, parallaxX: 0, parallaxY: 0 });
    };

    return (
        <div
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-8 text-white shadow-card`}
            onMouseMove={handlePointerMove}
            onMouseLeave={resetTilt}
            onMouseEnter={resetTilt}
            style={supportsHover
                ? {
                    transform: `perspective(1100px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg)`,
                    transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "transform",
                }
                : undefined
            }
            aria-hidden="true"
        >
            {photo ? (
                <Image
                    src={photo.url}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="absolute inset-0 object-cover opacity-40 mix-blend-luminosity"
                />
            ) : null}
            <div
                className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-sm"
                style={supportsHover
                    ? {
                        transform: `translate3d(${tiltState.parallaxX * 0.6}px, ${tiltState.parallaxY * 0.6}px, 0)`,
                        transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }
                    : undefined
                }
            />
            <div
                className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-cocoa-900/15"
                style={supportsHover
                    ? {
                        transform: `translate3d(${tiltState.parallaxX * -0.45}px, ${tiltState.parallaxY * -0.45}px, 0)`,
                        transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }
                    : undefined
                }
            />

            <div className="relative grid grid-cols-2 gap-4">
                <div className="col-span-2 -mb-1 rounded-2xl bg-white/10 p-2">
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={animationData}
                        loop
                        autoplay
                        className="mx-auto h-44 w-full max-w-xs"
                    />
                </div>

                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/80">Day 1</p>
                    <p className="mt-2 text-sm font-semibold">City center walk</p>
                    <p className="mt-1 text-xs text-white/85">08:30 - 12:00</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/80">Budget</p>
                    <p className="mt-2 text-sm font-semibold">Low-cost mode</p>
                    <p className="mt-1 text-xs text-white/85">Food + transit + tips</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/80">Route</p>
                    <div className="mt-2 h-2 rounded-full bg-white/25">
                        <div className="h-full w-2/3 rounded-full bg-white" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-white/85">
                        <span>4.8 km</span>
                        <span>2h 10m walk</span>
                        <span>Easy</span>
                    </div>
                </div>
            </div>

            {photo ? (
                <p className="relative z-10 mt-3 text-right text-[10px] text-white/60">
                    Photo by {photo.credit.name} on Unsplash
                </p>
            ) : null}
        </div>
    );
}

const ANIMATION_BY_ID: Record<ShowcaseId, object> = {
    shoot: shootPlanAnimation,
    "call-sheets": callSheetsAnimation,
    locations: locationsMapAnimation,
};

const ANIMATION_SPEED_BY_ID: Record<ShowcaseId, number> = {
    shoot: 1,
    "call-sheets": 0.9,
    locations: 0.8,
};

interface WorkflowShowcaseProps {
    images?: Partial<Record<ShowcaseId, Photo | null>>;
}

export default function WorkflowShowcase({ images }: WorkflowShowcaseProps) {
    const [activeId, setActiveId] = useState<ShowcaseId>("shoot");
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const updateSmallScreen = (event?: MediaQueryListEvent) => {
            setIsSmallScreen(event ? event.matches : mediaQuery.matches);
        };

        updateSmallScreen();
        mediaQuery.addEventListener("change", updateSmallScreen);
        return () => mediaQuery.removeEventListener("change", updateSmallScreen);
    }, []);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                threshold: 0.15,
                rootMargin: "120px 0px",
            }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const active = useMemo(
        () => ITEMS.find((item) => item.id === activeId) ?? ITEMS[0],
        [activeId]
    );

    const getDelay = (desktopMs: number) => `${isSmallScreen ? Math.round(desktopMs * 0.58) : desktopMs}ms`;
    const activeAnimationSpeed = isSmallScreen
        ? Math.min(ANIMATION_SPEED_BY_ID[active.id] + 0.16, 1.2)
        : ANIMATION_SPEED_BY_ID[active.id];

    return (
        <section ref={sectionRef} className="mx-auto mt-20 max-w-7xl px-6">
            <div className="rounded-[2rem] bg-cocoa-50/70 p-4 ring-1 ring-cocoa-100 sm:p-7">
                <div className="grid gap-4 md:grid-cols-3">
                    {ITEMS.map((item) => {
                        const isActive = item.id === active.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveId(item.id)}
                                className={`group relative overflow-hidden rounded-3xl border px-5 py-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-300 ${isActive
                                    ? "border-emerald-500 bg-white text-white shadow-soft"
                                    : "border-cocoa-100 bg-white text-cocoa-700 hover:border-coral-200 hover:shadow-soft"
                                    }`}
                                aria-pressed={isActive}
                            >
                                <span
                                    className={`pointer-events-none absolute inset-0 rounded-3xl bg-emerald-500 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    aria-hidden="true"
                                />
                                <span className="relative z-10 block transition-colors duration-300">
                                    <IconBadge icon={item.icon} tone={item.badgeTone} active={isActive} />
                                    <p className="mt-3 text-2xl font-semibold">{item.tabLabel}</p>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-7 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cocoa-100 sm:p-10">
                    <div key={active.id} className="workflow-fade-up">
                        <div className="grid items-center gap-10 lg:grid-cols-2">
                            <div className="workflow-fade-up" style={{ animationDelay: getDelay(80) }}>
                                <p className="text-sm font-semibold tracking-[0.14em] text-emerald-600">
                                    {active.eyebrow}
                                </p>
                                <h3 className="mt-3 font-display text-4xl leading-tight text-cocoa-800 sm:text-5xl">
                                    {active.title}
                                </h3>
                                <p className="mt-4 max-w-xl text-lg leading-relaxed text-cocoa-600">
                                    {active.description}
                                </p>
                                <Link href={active.ctaHref} className="btn-primary mt-7 inline-flex !rounded-xl !px-6 !py-3 text-base">
                                    + {active.ctaLabel}
                                </Link>
                            </div>

                            <div className="workflow-scale-in" style={{ animationDelay: getDelay(140) }}>
                                <Illustration
                                    accent={active.accent}
                                    animationData={ANIMATION_BY_ID[active.id]}
                                    animationSpeed={activeAnimationSpeed}
                                    inView={inView}
                                    photo={images?.[active.id] ?? null}
                                />
                            </div>
                        </div>

                        <div className="mt-10 border-t border-cocoa-100 pt-8">
                            <h4 className="workflow-fade-up font-display text-3xl text-cocoa-800" style={{ animationDelay: getDelay(180) }}>
                                Here&#39;s how it works
                            </h4>
                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                {active.steps.map((step, index) => (
                                    <article
                                        key={step}
                                        className="workflow-fade-up rounded-2xl bg-cocoa-50 px-4 py-4 ring-1 ring-cocoa-100"
                                        style={{ animationDelay: getDelay(220 + index * 70) }}
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cocoa-500">
                                            Step {index + 1}
                                        </p>
                                        <p className="mt-1 text-lg font-semibold text-cocoa-800">{step}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
