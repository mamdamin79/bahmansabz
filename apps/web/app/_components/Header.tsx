import Link from "next/link";
import { AccountNavigation } from "./AccountNavigation";

export const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "burlywood",
        color: "white",
      }}
    >
      <h1>Bahmansabz</h1>
      <nav>
        <ul
          style={{
            display: "flex",
            gap: "10px",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <li style={{ listStyle: "none" }}>
            <Link href="/">Home</Link>
          </li>
          <AccountNavigation />
        </ul>
      </nav>
    </header>
  );
};
