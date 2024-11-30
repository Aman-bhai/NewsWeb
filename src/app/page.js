import Container from "./components/Container";

export default function Home() {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 min-h-screen">
      <Container API={process.env.NEXT_PUBLIC_API_KEY} category={"general"} />
    </main>
  );
}
