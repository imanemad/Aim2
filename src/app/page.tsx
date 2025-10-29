import Link from "next/link";

export default function Home() {
  return (
      <div className="GridCenter h-dvh">
        <div className="flex flex-col items-center">
          <div className="text-xl! mb-10">HOME PAGE</div>
          <Link href="/application" className="text-blue-600!">Application</Link>
        </div>
      </div>
  );
}
