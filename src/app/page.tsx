import Navbar from "@/app/components/Navbar"
import Container from "@/app/components/Container"

export default function Home() {
  
  return (
  <main >
    <Container API={process.env.API} category={"general"}/>
  </main>
  );
}

