import useSound from "use-sound";

import pop from "~/assets/pop.mp3";

export const usePopSounds = () => {
  const [play] = useSound(pop, {
    volume: 0.5,
  });

  const playRandomPopSound = () =>
    play({
      playbackRate: Math.random() * 0.5 + 0.5,
    });
  return { playRandomPopSound };
};
