import { FC } from 'react';

export type Props = {
  dogImageSrc: string;
};
const DogImage: FC<Props> = ({ dogImageSrc }) => {
  return <img alt='random_dog' width='300' height='300' src={dogImageSrc} />;
};

export default DogImage;
