import Background from "../components/auth/Background";
import HeroSection from "../components/auth/HeroSection";
import LoginCard from "../components/auth/LoginCard";

export default function Login() {
  return (
    <>
      <Background />

      <div
        className="
          relative
          z-10
          h-screen
           overflow-hidden
          flex
          px-8
          lg:px-20
          xl:px-32
        "
      >
        <HeroSection />

        <div
          className="
            flex
            w-full
            lg:w-[45%]
            items-center
            justify-center
            px-8
          "
        >
          <LoginCard />
        </div>
      </div>
    </>
  );
}
