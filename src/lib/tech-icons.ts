import bun from "devicon/icons/bun/bun-original.svg";
import electron from "devicon/icons/electron/electron-original.svg";
import expo from "devicon/icons/expo/expo-original.svg";
import express from "devicon/icons/express/express-original.svg";
import javascript from "devicon/icons/javascript/javascript-original.svg";
import jest from "devicon/icons/jest/jest-plain.svg";
import mongoose from "devicon/icons/mongoose/mongoose-original.svg";
import nestjs from "devicon/icons/nestjs/nestjs-original.svg";
import nextjs from "devicon/icons/nextjs/nextjs-original.svg";
import nodejs from "devicon/icons/nodejs/nodejs-original.svg";
import prisma from "devicon/icons/prisma/prisma-original.svg";
import react from "devicon/icons/react/react-original.svg";
import socketio from "devicon/icons/socketio/socketio-original.svg";
import tailwindcss from "devicon/icons/tailwindcss/tailwindcss-original.svg";
import typescript from "devicon/icons/typescript/typescript-original.svg";
import vitejs from "devicon/icons/vitejs/vitejs-original.svg";
import vitest from "devicon/icons/vitest/vitest-original.svg";
import webpack from "devicon/icons/webpack/webpack-original.svg";
import type { StaticImageData } from "next/image";
import dotnet from "simple-icons/icons/dotnet.svg";
import drizzle from "simple-icons/icons/drizzle.svg";
import esbuild from "simple-icons/icons/esbuild.svg";
import go from "simple-icons/icons/go.svg";
import openjdk from "simple-icons/icons/openjdk.svg";
import php from "simple-icons/icons/php.svg";
import python from "simple-icons/icons/python.svg";
import reactquery from "simple-icons/icons/reactquery.svg";
import ruby from "simple-icons/icons/ruby.svg";
import rust from "simple-icons/icons/rust.svg";
import tanstack from "simple-icons/icons/tanstack.svg";
import turborepo from "simple-icons/icons/turborepo.svg";

/**
 * Icon mapping for the technologies and ecosystems documented on this site.
 *
 * Devicon (full-color brand marks) is the primary source; Simple Icons is the
 * fallback for marks Devicon does not ship. Both are bundled locally, so every
 * icon resolves without a network request.
 *
 * `image` keeps the original brand colours (with an optional Tailwind filter for
 * near-black marks on the dark surface). `mask` tints a monochrome Simple Icons
 * glyph with a brand color via CSS `mask`.
 */
export type TechIconDescriptor = { kind: "image"; src: string; adjust?: string } | { kind: "mask"; src: string; color: string };

type IconModule = string | StaticImageData;

function url(mod: IconModule): string {
    return typeof mod === "string" ? mod : mod.src;
}

const image = (mod: IconModule, adjust?: string): TechIconDescriptor => ({ kind: "image", src: url(mod), adjust });
const mask = (mod: IconModule, color: string): TechIconDescriptor => ({ kind: "mask", src: url(mod), color });

const TECH_ICONS: Record<string, TechIconDescriptor> = {
    // Languages
    javascript: image(javascript),
    typescript: image(typescript),

    // Frontend
    react: image(react),
    next: image(nextjs, "invert"),
    "react-native": image(react),
    expo: image(expo, "invert"),

    // Backend
    node: image(nodejs),
    express: image(express, "invert"),
    nestjs: image(nestjs),

    // Styling
    tailwindcss: image(tailwindcss),

    // Database / ORM
    prisma: image(prisma, "invert"),
    mongoose: image(mongoose, "brightness-150"),
    drizzle: mask(drizzle, "#C5F74F"),

    // Tools
    vite: image(vitejs),
    "tanstack-query": mask(reactquery, "#FF4154"),
    "tanstack-router": mask(tanstack, "#ECE8D1"),
    socketio: image(socketio, "invert"),
    electron: image(electron),
    "electron-vite": image(electron),
    turborepo: mask(turborepo, "#FF1E56"),
    bun: image(bun),
    jest: image(jest),
    vitest: image(vitest),
    webpack: image(webpack),
    esbuild: mask(esbuild, "#FFCF00"),

    // Ecosystems (not detected yet, shown for completeness)
    python: mask(python, "#3776AB"),
    rust: mask(rust, "#FFFFFF"),
    go: mask(go, "#00ADD8"),
    java: mask(openjdk, "#ED8B00"),
    ruby: mask(ruby, "#CC342D"),
    php: mask(php, "#777BB4"),
    dotnet: mask(dotnet, "#512BD4"),
};

export function getTechIcon(name: string): TechIconDescriptor | undefined {
    const key = name.trim().toLowerCase();
    return key.length > 0 ? TECH_ICONS[key] : undefined;
}
