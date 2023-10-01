import styles from "@/components/Footer/Footer.module.css";
import Link from "next/link";
import { MenuItem } from "@/saleor/api";
import { getLinkPath } from "@/lib/menus";
import { useRegions } from "@/components/RegionsProvider";

export type FooterMenu = MenuItem[];

export type FooterMenuProps = {
  menu: FooterMenu;
};

const fixMenuItemLocalhostUrl = (url: string) => url.replace(/^https?:\/\/localhost:8000\//, "/");

export function FooterMenu({ menu }: FooterMenuProps) {
  const { currentChannel, currentLocale } = useRegions();

  return (
    <div className="w-full">
      {menu.map((item) => (
        <div className="" key={item?.id}>
          {item?.url ? (
            <a href={item.url} target="_blank" rel="noreferrer" className={styles["menu-heading"]}>
              {item?.name}
            </a>
          ) : (
            <Link
              href={getLinkPath(item, currentChannel.slug, currentLocale)}
              passHref
              legacyBehavior
            >
              <a href="pass" className={styles["menu-heading"]}>
                {item?.name}
              </a>
            </Link>
          )}
          <ul className={styles.menu}>
            {item?.children?.map((sub) => (
              <li key={sub?.id}>
                {sub?.url ? (
                  <a
                    href={fixMenuItemLocalhostUrl(sub.url)}
                    target="_blank"
                    rel="noreferrer"
                    className={styles["menu-link"]}
                    data-testid={`footerExternalLinks${sub?.name}`}
                  >
                    {sub?.name}
                  </a>
                ) : (
                  <Link
                    href={getLinkPath(sub, currentChannel.slug, currentLocale)}
                    passHref
                    legacyBehavior
                  >
                    <a
                      href="pass"
                      className={styles["menu-link"]}
                      data-testid={`footerInternalLinks${sub?.name}`}
                    >
                      {sub?.name}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
