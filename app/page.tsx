import Image from "next/image";
import './globals.css';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-50 font-sans dark:bg-black">

      <header className="header">
        <h1
          className="
          text-[50px]
          text-black
          dark: text-white
          ">Welcome to Haylo</h1>
      </header>

      <main className="main">
        <p>New This Week</p>
        <p>Popular</p>
        <p>Recently added</p>
        <p>Most Anticipated</p>
        <p>Staff Picks</p>
        <p>Buy 2, Get a free third kids book</p>
        <p>Horror</p>





      </main>

      <footer className="footer">


        <p>Rewards</p>
        <p>Careers</p>
        <p>Give Us Feedback</p>
        <p>About Haylo</p>
        <p>Shipping and Returns</p>
        <p>Product Recalls</p>
        <p>Frequently Asked Questions</p>

      </footer>




    </div>
  );
}
