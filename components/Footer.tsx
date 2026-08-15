import Image from "next/image";
import { company } from "@/lib/company";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/images/logo.png"
              alt={company.name}
              width={220}
              height={96}
              style={{ height: 48, width: "auto" }}
            />
            <p>{company.description}</p>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#fleet">Fleet</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul>
              <li>
                <a href={`mailto:${company.contact.email}`}>
                  {company.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.contact.phone.replace(/[^+\d]/g, "")}`}>
                  {company.contact.phone}
                </a>
              </li>
              <li>{company.contact.address}</li>
              <li>{company.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {company.name}. All rights reserved.
          </span>
          <span>
            Ontario Business Corp. · BN {company.businessNumber} · Registry ID{" "}
            {company.registryId}
          </span>
        </div>
      </div>
    </footer>
  );
}
