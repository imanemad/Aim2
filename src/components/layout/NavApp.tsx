import Logo from "@/components/icons/Logo";
import moment from "moment-jalaali";
import Link from "next/link";

export default function NavApp() {
  const date = moment().format("jYYYY/jMM/jDD");
  return (
    <nav className="Nav">
      <div className="d-flex align-items-center Gap-8">{date}</div>
      <div className="Logo">
        <Link href="/">
          <Logo size={20} />
        </Link>
        {/* <div className="leading-none">Aim finance</div> */}
      </div>
    </nav>
  );
}
