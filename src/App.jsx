import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Feature from './components/Feature/Feature';
import Hero from './components/Hero/Hero';
import { features } from './data/features';
import { fetchUser } from './features/login/loginSlice';
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
      dispatch(fetchUser());
    }
  }, [dispatch, loggedIn]);

  return (
    <main className="main">
      <Hero />
      <section className={styles.features}>
        <h2 className="sr-only">Features</h2>
        {features.map((feature) => (
          <Feature
            title={feature.title}
            text={feature.text}
            image={feature.image}
            imageAltText={feature.imageAltText}
            key={feature.key}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
