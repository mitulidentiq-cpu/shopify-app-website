import logo1 from "@/app logo/logo1.png";

export function MinimalFooter() {
	const year = new Date().getFullYear();

	const company = [
		{
			title: 'About Us',
			href: '/about',
		},
		{
			title: 'Connect With Us',
			href: '/connect',
		},
		{
			title: 'Contact Us',
			href: '/contact',
		},
		{
			title: 'FAQs',
			href: '/faq',
		},
	];

	const resources = [
		{
			title: 'User Guide',
			href: '/guide',
		},
		{
			title: 'Blog',
			href: '/blog',
		},
		{
			title: 'Privacy Policy',
			href: '/privacy',
		},
		{
			title: 'Terms of Service',
			href: '/terms',
		},
	];

	const products = [
		{
			title: 'AI Section Hub',
			href: 'https://apps.shopify.com/sectionly?search_id=51ad5287-4c05-4dd7-a428-e2f8353694e1&surface_detail=ai9+section+hub&surface_inter_position=1&surface_intra_position=5&surface_type=search',
		},
		{
			title: 'Variantify',
			href: 'https://apps.shopify.com/variantify-1?search_id=2bf64c58-8f42-4490-94cc-ea44d5bab45f&surface_detail=klenzo&surface_inter_position=1&surface_intra_position=1&surface_type=search',
		},
		{
			title: 'ROI Calculator',
			href: '/roi-calculator',
		},
	];

	const socialLinks = [
		{
			icon: (
				<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
				</svg>
			),
			link: '#',
		},
		{
			icon: (
				<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
				</svg>
			),
			link: 'https://github.com',
		},
		{
			icon: (
				<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
					<rect x="2" y="9" width="4" height="12" />
					<circle cx="4" cy="4" r="2" />
				</svg>
			),
			link: 'https://linkedin.com',
		},
		{
			icon: (
				<svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
					<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
					<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
				</svg>
			),
			link: 'mailto:mitulzalavadiya11@gmail.com',
		},
	];

	return (
		<footer className="relative bg-black text-white border-t border-zinc-800">
			<div className="bg-[radial-gradient(35%_80%_at_30%_0%,rgba(255,255,255,0.05),transparent)] mx-auto max-w-5xl">
				<div className="grid grid-cols-12 gap-8 pt-12 pb-8 px-8">
					<div className="col-span-12 flex flex-col gap-5 md:col-span-5">
						<a href="#" className="w-max">
							<img src={logo1} alt="Klenzo Logo" className="h-8 w-auto object-contain" style={{ filter: 'invert(1)' }} />
						</a>
						<p className="text-zinc-400 max-w-sm text-sm text-balance">
							Maximize your Average Order Value on Shopify with lightning-fast AI-powered bundles, upcells, and volume discounts. Built by Klenzo.
						</p>
						<div className="flex gap-2">
							{socialLinks.map((item, i) => (
								<a
									key={i}
									className="hover:bg-zinc-800 rounded-md border border-zinc-800 p-1.5 duration-200 flex items-center justify-center text-zinc-400 hover:text-white"
									target="_blank"
									rel="noopener noreferrer"
									href={item.link}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-4 w-full md:col-span-2">
						<span className="text-zinc-400 mb-3 block text-xs font-headings font-bold uppercase tracking-wider">
							Products
						</span>
						<div className="flex flex-col gap-2">
							{products.map(({ href, title }, i) => (
								<a
									key={i}
									className="w-max text-sm text-zinc-400 duration-200 hover:text-white hover:underline"
									target={href.startsWith("http") ? "_blank" : undefined}
									rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-4 w-full md:col-span-2">
						<span className="text-zinc-400 mb-3 block text-xs font-headings font-bold uppercase tracking-wider">
							Company
						</span>
						<div className="flex flex-col gap-2">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className="w-max text-sm text-zinc-400 duration-200 hover:text-white hover:underline"
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-4 w-full md:col-span-3">
						<span className="text-zinc-400 mb-3 block text-xs font-headings font-bold uppercase tracking-wider">
							Resources
						</span>
						<div className="flex flex-col gap-2">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className="w-max text-sm text-zinc-400 duration-200 hover:text-white hover:underline"
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="border-t border-zinc-800 flex flex-col justify-between gap-2 py-6 px-8">
					<p className="text-zinc-500 text-center text-xs">
						&copy; {year} Klenzo. All rights reserved. Shopify is a registered trademark of Shopify Inc.
					</p>
				</div>
			</div>
		</footer>
	);
}
