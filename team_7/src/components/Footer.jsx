import React from "react"
import Image from "next/image"
import styles from "../styles/footer.module.css"
import hassan from "../../public/hassan.jpg"
import jana from "../../public/Jana.jpg"
import muna from "../../public/muna.jpg"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.developers}>
        {/* Muna Al Haj Eid */}
        <div className={styles.developer}>
          <Image
            src={muna.src}
            alt=" Muna Al Haj Eid "
            width={100}
            height={100}
            class="h-16 w-16 rounded-full"
          />
          <div className={styles.links}>
            <a
              href="https://github.com/MonaAlHajEid"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/monabadei/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Hassan AbuGareeb */}
        <div className={styles.developer}>
          <Image
            src={hassan.src}
            alt=" Hassan AbuGareeb "
            width={100}
            height={100}
          />
          <div className={styles.links}>
            <a
              href="https://github.com/Hassan-AbuGareeb"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hassan-abu-ghareeb-a13b1126a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Jana Salah*/}
        <div className={styles.developer}>
          <img src={jana.src} alt=" Jana Salah " width={100} height={100} />
          <div className={styles.links}>
            <a
              href="https://github.com/JanaAbuHaltam"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jana-abuhaltam-b00335288/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Connect with us on social media for the latest updates and more movie
        magic!
      </p>
    </footer>
  )
}

export default Footer
