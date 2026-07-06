import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState, useEffect } from "react";

import logo1 from "@/app logo/logo1.png"
import shopifyBadge from "@/images/shopify badge.png"

function Header1() {
    const navigationItems = [
        {
            title: "Home",
            href: "/",
            description: "",
        },
        {
            title: "Product",
            description: "Install our powerful Shopify apps to grow your store instantly.",
            items: [
                {
                    title: "AI Section Hub",
                    href: "https://apps.shopify.com/sectionly?search_id=51ad5287-4c05-4dd7-a428-e2f8353694e1&surface_detail=ai9+section+hub&surface_inter_position=1&surface_intra_position=5&surface_type=search",
                },
                {
                    title: "Variantify",
                    href: "https://apps.shopify.com/variantify-1?search_id=2bf64c58-8f42-4490-94cc-ea44d5bab45f&surface_detail=klenzo&surface_inter_position=1&surface_intra_position=1&surface_type=search",
                },
            ],
        },
        {
            title: "Company",
            description: "Solvify Tech offers bespoke Web, App, and Digital Marketing Solutions.",
            items: [
                {
                    title: "About us",
                    href: "https://www.solvifytech.in/about-us",
                },
                {
                    title: "Our Services",
                    href: "https://www.solvifytech.in/services",
                },
                {
                    title: "Portfolio",
                    href: "https://www.solvifytech.in/portfolio",
                },
                {
                    title: "Contact us",
                    href: "https://www.solvifytech.in/contact-us",
                },
            ],
        },
    ];

    const [isOpen, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80 && !isOpen) {
                // Scrolling down - hide header
                setVisible(false);
            } else {
                // Scrolling up - show header
                setVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, isOpen]);

    return (
        <header className={`w-full z-40 fixed top-0 left-0 bg-background border-b border-border transition-transform duration-300 ease-in-out ${
            visible ? "translate-y-0" : "-translate-y-full"
        }`}>
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center px-4">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <>
                                            <NavigationMenuLink href={item.href}>
                                                <Button variant="ghost">{item.title}</Button>
                                            </NavigationMenuLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-sm">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4 bg-popover text-popover-foreground rounded-md border shadow-md">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base font-semibold">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" className="mt-10" asChild>
                                                            <a href="mailto:mitulzalavadiya11@gmail.com">
                                                                Email us today
                                                            </a>
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                href={subItem.href}
                                                                target={subItem.href.startsWith("http") ? "_blank" : undefined}
                                                                rel={subItem.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                                key={subItem.title}
                                                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                            >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <img src={logo1} alt="App Logo" className="h-14 w-auto object-contain" style={{ filter: 'invert(1)' }} />
                </div>
                <div className="flex justify-end w-full gap-4 items-center">
                    <a href="https://apps.shopify.com/partners/solvify-tech2" target="_blank" rel="noopener noreferrer" className="hidden md:inline-block z-20">
                        <img src={shopifyBadge} alt="Shopify Badge" className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-300" />
                    </a>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)} size="icon">
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 px-4 gap-8 z-50">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="flex justify-between items-center py-1"
                                            >
                                                <span className="text-lg font-medium">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </a>
                                        ) : (
                                            <p className="text-lg font-medium">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <a
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    target={subItem.href.startsWith("http") ? "_blank" : undefined}
                                                    rel={subItem.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    className="flex justify-between items-center pl-4 py-1 text-muted-foreground hover:text-foreground"
                                                >
                                                    <span>
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
                                                </a>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 };
