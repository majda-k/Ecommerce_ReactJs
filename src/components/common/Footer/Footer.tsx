import styles from "./styles.module.css";

export default function Footer() {
    const { footerContainer } = styles;
    return (
       
      <div className={footerContainer}>
        <p>Copyright © 2025 Our eCom. All rights reserved.</p>
      </div>
    )
}