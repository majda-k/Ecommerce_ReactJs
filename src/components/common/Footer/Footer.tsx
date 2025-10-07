import styles from "./styles.module.css";

export default function Footer() {
    const { footerContainer } = styles;
    return (
       
      <div className={footerContainer}>
        <p>Copyright © 2025 Our Ecommerce. All rights reserved.</p>
      </div>
    )
}