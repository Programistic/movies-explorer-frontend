const TimeConversion = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time - hours * 60;
  return (hours > 0) ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

export default TimeConversion;
