"use client";

import { useEffect, useRef } from "react";

export default function WindScene({
	particle_count,
	contrast,
}: {
	particle_count: number;
	contrast: boolean;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		const parent = canvas.parentElement!;
		canvas.width = parent.clientWidth;
		canvas.height = parent.clientHeight;

		let w = canvas.width;
		let h = canvas.height;

		const mouse = { x: w / 2 };

		const rand = (a: number, b: number) => Math.random() * (b - a) + a;

		type P = {
			type: "dust" | "ash" | "ember" | "shard" | "strip";
			x: number;
			y: number;
			size: number;
			depth: number;
			speed: number;
			rot: number;
			rotSpeed: number;
			opacity: number;
			sway: number;
			seed: number;
		};

		const particles: P[] = [];

		function create(): P {
			const r = Math.random();

			const type =
				r < 0.55
					? "dust"
					: r < 0.75
						? "ash"
						: r < 0.87
							? "ember"
							: r < 0.95
								? "shard"
								: "strip";

			const depth = Math.random();

			return {
				type,
				x: rand(0, w),
				y: rand(0, h),
				size:
					type === "dust"
						? rand(1, 3)
						: type === "ash"
							? rand(2, 4)
							: type === "ember"
								? rand(1, 2)
								: type === "shard"
									? rand(6, 12)
									: rand(14, 22),

				depth,
				speed: rand(0.2, 0.6) * (0.5 + depth),
				rot: rand(0, Math.PI),
				rotSpeed: rand(-0.02, 0.02),
				opacity: rand(0.15, 0.5) * (0.4 + depth),
				sway: rand(0.2, 0.8),
				seed: Math.random() * 1000,
			};
		}

		for (let i = 0; i < particle_count; i++) particles.push(create());

		function draw(p: P, t: number) {
			ctx.save();
			ctx.globalAlpha = p.opacity;
			ctx.translate(p.x, p.y);
			ctx.rotate(p.rot);

			switch (p.type) {
				case "dust":
					ctx.fillStyle = contrast ? "#6b4a45" : "#1e1312";
					ctx.beginPath();
					ctx.arc(0, 0, p.size, 0, Math.PI * 2);
					ctx.fill();
					break;

				case "ash":
					ctx.fillStyle = contrast ? "#6b4a45" : "#1e1312";
					ctx.fillRect(0, 0, p.size, p.size * 0.6);
					break;

				case "ember":
					ctx.fillStyle = contrast
						? "rgba(255,110,90,0.85)"
						: "rgba(122,30,27,0.35)";
					ctx.beginPath();
					ctx.arc(0, 0, p.size, 0, Math.PI * 2);
					ctx.fill();
					break;

				case "shard":
					ctx.strokeStyle = contrast ? "#7a5450" : "#1e1312";
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(-p.size, 0);
					ctx.lineTo(p.size, 0);
					ctx.stroke();
					break;

				case "strip":
					ctx.fillStyle = "#e6d2b5"; // already max contrast
					ctx.fillRect(0, 0, p.size * 0.25, p.size);
					break;
			}

			ctx.restore();
		}

		let time = 0;

		function update() {
			time += 0.01;

			ctx.clearRect(0, 0, w, h);

			// base steady cross-wind
			const baseWind = 0.45;

			// slow global breathing (very low frequency)
			const gust = Math.sin(time * 0.15) * 0.12 + Math.sin(time * 0.05) * 0.08;

			// final wind value
			const wind = baseWind + gust;

			particles.forEach((p) => {
				p.x += wind * p.speed * 4;

				p.y += Math.sin(time + p.seed) * p.sway;

				p.rot += p.rotSpeed;

				if (p.x > w + 60) {
					Object.assign(p, create(), {
						x: -60,
						y: rand(0, h),
					});
				}
				if (p.x < -60) {
					Object.assign(p, create(), {
						x: w + 60,
						y: rand(0, h),
					});
				}

				draw(p, time);
			});

			requestAnimationFrame(update);
		}

		update();

		window.addEventListener("mousemove", (e) => {
			mouse.x = e.clientX;
		});

		window.addEventListener("resize", () => {
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
		});
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full h-full pointer-events-none z-0"
		/>
	);
}
