"use client";

import { useQRCode } from "next-qrcode";

export default function QrCode({ text }: { text: string }) {
	const { SVG } = useQRCode();

	return (
		<SVG
			text={text}
			options={{
				margin: 2,
				width: 200,
				color: {
					dark: "#e6d2b5",
					light: "#120a0a",
				},
			}}
		/>
	);
}
