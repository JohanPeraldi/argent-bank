import Feature from './components/Feature/Feature';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Navigation from './components/Navigation/Navigation';
import chatIcon from './img/icon-chat.png';
import moneyIcon from './img/icon-money.png';
import securityIcon from './img/icon-security.png';
import styles from './App.module.css';

function App() {
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
    <div>
      <Navigation />
      <main className={styles.main}>
        <Hero />
        <section className={styles.features}>
          <h2 className={styles['sr-only']}>Features</h2>
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
      <Footer />
    </div>
  );
}

export default App;
