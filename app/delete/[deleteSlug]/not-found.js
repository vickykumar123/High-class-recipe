import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Unable to find the requested meal</h1>
      <p>
        <Link href="/meals" replace>
          Please select the vaild meal
        </Link>
      </p>
    </div>
  );
}
