import { useLocalStorage } from 'usehooks-ts';

const checkUserType = () => {
  const [userType] = useLocalStorage('userType', '');

  if (userType === 'company' || userType === 'customer') {
    return true;
  }

  return false;
};

export default checkUserType;
