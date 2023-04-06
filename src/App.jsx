import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Feature from './components/Feature/Feature';
import Hero from './components/Hero/Hero';
import { fetchUser } from './features/login/loginSlice';
import chatIcon from './img/icon-chat.png';
import moneyIcon from './img/icon-money.png';
import securityIcon from './img/icon-security.png';
import styles from './App.module.css';

function App() {
  // Update page title
  useEffect(() => {
    document.title = 'Argent Bank - Home Page';
  }, []);

  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();
  // Get user data if user is logged in
  useEffect(() => {
    if (loggedIn) {
      console.log('Logged in!');
      dispatch(fetchUser());
    }
  }, [dispatch, loggedIn]);

  const firstFeatureText =
    'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.';
  const firstFeatureTitle = 'You are our #1 priority';
  const chatIconAltText = 'Chat icon';
  const secondFeatureText =
    'The more you save with us, the higher your interest rate will be!';
  const secondFeatureTitle = 'More savings means higher rates';
  const moneyIconAltText = 'Money icon';
  const thirdFeatureText =
    'We use top of the line encryption to make sure your data and money is always safe.';
  const thirdFeatureTitle = 'Security you can trust';
  const securityIconAltText = 'Security icon';
  const data = [
    [firstFeatureTitle, firstFeatureText, chatIcon, chatIconAltText, 1],
    [secondFeatureTitle, secondFeatureText, moneyIcon, moneyIconAltText, 2],
    [thirdFeatureTitle, thirdFeatureText, securityIcon, securityIconAltText, 3],
  ];

  return (
    <main className="main">
      <Hero />
      <section className={styles.features}>
        <h2 className="sr-only">Features</h2>
        {data.map((feature) => (
          <Feature
            title={feature[0]}
            text={feature[1]}
            image={feature[2]}
            imageAltText={feature[3]}
            key={feature[4]}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
