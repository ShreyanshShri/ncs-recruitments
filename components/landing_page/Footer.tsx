import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-beige text-bg-dark font-shuriken border-t border-border-red">
			<div className="max-w-7xl mx-auto px-6 py-16">
				{/* TOP GRID */}
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
					{/* BRAND */}
					<div>
						<h2 className="text-2xl text-primary-red mb-4">HackNCS</h2>
						<p className="text-sm text-bg-dark/70">
							Building the next generation of creators, developers, and
							designers.
						</p>
					</div>

					{/* LINKS */}
					<div>
						<h3 className="text-primary-red mb-4 text-sm tracking-wider">
							Quick Links
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="/#" className="hover:text-primary-red">
									Home
								</Link>
							</li>
							<li>
								<Link href="/#timeline" className="hover:text-primary-red">
									Timeline
								</Link>
							</li>
							<li>
								<Link href="/#domains" className="hover:text-primary-red">
									Domains
								</Link>
							</li>
							<li>
								<a
									href="https://hackncs.in/team"
									className="hover:text-primary-red"
								>
									Team
								</a>
							</li>
						</ul>
					</div>

					{/* RESOURCES */}
					{/* <div>
						<h3 className="text-primary-red mb-4 text-sm tracking-wider">
							Resources
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a href="/auth/register" className="hover:text-primary-red">
									Apply
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-primary-red">
									Guidelines
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-primary-red">
									FAQs
								</a>
							</li>
							<li>
								<a
									href="https://hackncs.in/team"
									className="hover:text-primary-red"
								>
									Contact
								</a>
							</li>
						</ul>
					</div> */}

					{/* CTA */}
					<div>
						<h3 className="text-primary-red mb-4 text-sm tracking-wider">
							Join Our Open Community
						</h3>
						<p className="text-sm mb-4 text-bg-dark/70">
							Become a part of the HackNCS community on Whatsapp.
						</p>

						<a href="https://chat.whatsapp.com/IrXRGb7JXpKFwXJfW8NMq8">
							<button className="bg-primary-red text-light-beige px-5 py-2 rounded-lg hover:bg-dark-red transition">
								JOIN NOW
							</button>
						</a>
					</div>
				</div>

				{/* BOTTOM BAR */}
				<div className="border-t border-border-red mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-bg-dark/70">
					<p>© {new Date().getFullYear()} HackNCS. All rights reserved.</p>

					{/* SOCIALS */}
					<div className="flex gap-5">
						{/* <a href="#" className="hover:text-primary-red">
							Twitter
						</a> */}
						<a
							href="https://in.linkedin.com/company/hackncs"
							className="hover:text-primary-red"
						>
							LinkedIn
						</a>
						<a
							href="https://www.instagram.com/hackncs/"
							className="hover:text-primary-red"
						>
							Instagram
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
