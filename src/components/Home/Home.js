import Button from 'components/UI/Button/Button';
import { useContext } from 'react';
import AuthContext from 'store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>

      <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
