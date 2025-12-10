"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
	return (
		<a
			href="https://wa.me/+917675031977"
			target="_blank"
			rel="noopener noreferrer"
			className="
        fixed bottom-5 right-5 z-50
        flex items-center justify-center
        h-14 w-14 rounded-full
        bg-[#25D366] text-white text-3xl
        shadow-[0_10px_25px_rgba(0,0,0,0.25)]
        hover:scale-110 transition-transform
      ">
			<FaWhatsapp />
		</a>
	);
}
