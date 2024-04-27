import { useSpring, animated } from "@react-spring/web";

function FadeInNumber({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: n },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  const formattedNumber =
    n % 1 !== 0
      ? number.to((n) => n.toFixed(2))
      : number.to((n) => n.toFixed(0));
  return <animated.span>{formattedNumber}</animated.span>;
}

export default FadeInNumber;
