import styles from './Feature.module.css';

export default function Feature(props) {
  return (
    <div className={styles['feature-item']}>
      <img
        src={props.image}
        alt={props.imageAltText}
        className={styles['feature-icon']}
      />
      <h3 className={styles['feature-item-title']}>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
}
