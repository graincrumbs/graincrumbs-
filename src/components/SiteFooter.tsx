import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MapPin, Mail, Youtube, ShieldCheck } from "lucide-react";
const logo = "/assets/grain-crumbs/logo-premium.png";
// Drop the official FSSAI logo file (provided by the client / downloaded from
// https://fssai.gov.in) into your assets folder and point this path at it.
// Until then, the ShieldCheck icon below is used as a stand-in.
const fssaiLogo = "/assets/grain-crumbs/fssai-logo.png";
const FSSAI_REG_ID = "21526079004122";
const ZOMATO_URL = "https://www.zomato.com/pune/grain-crumbs-kharadi";

// Official Zomato mark (via simple-icons, MIT-licensed)
function ZomatoLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-[color:var(--cream-dark)] text-foreground">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-contain" />
            <div>
              <p className="font-display text-2xl">Grain Crumbs</p>
              <p className="text-[11px] tracking-[0.3em] text-muted-foreground">
                BROWNIES · BROWNIE CAKES · CUPCAKES · GIFTING
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Premium millet brownies, baked fresh. Made with ragi, foxtail millet,
            oats & buckwheat. Sweetened with jaggery. Crafted with premium couverture chocolate.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/brownies" className="underline-link">Brownies</Link></li>
            <li><Link to="/brownie-tubs" className="underline-link">Brownie Tubs</Link></li>
            <li><Link to="/brownie-cakes" className="underline-link">Brownie Cakes</Link></li>
            <li><Link to="/gifting" className="underline-link">Gifting</Link></li>
            <li><Link to="/about" className="underline-link">Our Story</Link></li>
            <li><Link to="/order" className="underline-link">Order Now</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Visit · Connect</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <a href="tel:+918208257574" className="underline-link">+91 82082 57574</a>
            </li>
            <li className="flex items-start gap-2">
              <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <a href="https://instagram.com/graincrumbs" target="_blank" rel="noreferrer" className="underline-link">
                @graincrumbs
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Youtube className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <a href="https://youtube.com/@graincrumbs?si=u-YRVSvuixrJap_T" target="_blank" rel="noreferrer" className="underline-link">
                Grain Crumbs: Behind The Scenes
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <a href="mailto:thegraincrumbs@gmail.com" className="underline-link">thegraincrumbs@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <ZomatoLogo className="mt-0.5 h-4 w-4 shrink-0 text-[#E23744]" />
              <a href={ZOMATO_URL} target="_blank" rel="noreferrer" className="underline-link">
                Live on Zomato
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* FSSAI Approved strip */}
      <div className="border-t border-border/70 bg-[color:var(--cream-dark)]">
        <div className="container-prose flex items-center justify-center gap-3 py-5">
          <img
            src={fssaiLogo}
            alt="FSSAI"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            onError={(e) => {
              // Falls back to a generic shield icon if fssai-logo.png hasn't been added yet
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-[color:var(--gold)]" />
            <span className="font-medium text-foreground">FSSAI Approved</span>
            <span className="text-muted-foreground">
              · Lic./Reg. No. {FSSAI_REG_ID}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container-prose flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 Grain Crumbs. All Rights Reserved.</p>
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p>
              Website Designed &amp; Developed by{" "}
              <a
                href="https://wa.me/919850416581"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[color:var(--chocolate)] underline-link hover:text-foreground"
              >
                Neha Kudale
              </a>
              {" "}
            </p>
            {/* <Link to="/admin/login" className="tracking-[0.25em] uppercase hover:text-foreground">Admin</Link> */}
          </div>
        </div>

      </div>
    </footer>
  );
}
