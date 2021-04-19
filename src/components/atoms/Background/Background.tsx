import React from "react";
import { useSpring, animated } from "react-spring";

const scrollRatio = (): number => {
  return Math.round(
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100
  );
};
const Background: React.FC = ({ children }) => {
  React.useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return (): void => document.removeEventListener("scroll", onScroll);
  });
  const [springProps, setSpring] = useSpring(() => ({
    transform: `translateY(0%) rotate(45deg)`,
  }));
  const onScroll = () => {
    const position = scrollRatio();
    setSpring
      .update({
        transform: `translateY(${position}%) rotate(45deg)`,
      })
      .start();
  };
  return (
    <>
      <div className="fixed w-full h-full bg-white dark:bg-black transition duration-500 ease-in-out">
        <div className="absolute opacity-50 -bottom-3/4 w-6/12 h-full animate-float bg-gradient-to-r from-gray-700 dark:from-gray-300" />
        <animated.div
          className="absolute opacity-75 w-over h-full bg-gradient-to-r from-transparent to-gray-700 dark:to-gray-300"
          style={springProps}
        />
      </div>
      <div className="relative">{children}</div>
    </>
  );
};

export default Background;
