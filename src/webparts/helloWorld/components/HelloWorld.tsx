import * as React from "react";
import { IHelloWorldProps } from "./IHelloWorldProps";
import styles from "./HelloWorld.module.scss";
import welcomeDark from "../assets/welcome-dark.png";
import welcomeLight from "../assets/welcome-light.png";
import Button from "./button";
import { useMockData } from "../hooks/useMockData";
import { IDisaster } from "../services";

const HelloWorld = (props: IHelloWorldProps): JSX.Element => {
  const { data, loading, error } = useMockData(props.context);

  return (
    <section className={`${styles.helloWorld}`}>
      <div className={styles.welcome}>
        <img
          alt=""
          src={props.isDarkTheme ? welcomeDark : welcomeLight}
          className={styles.welcomeImage}
        />
        <h2>Well done, {props.userDisplayName}!</h2>
        <div>{props.environmentMessage}</div>
        <div>
          Web part property value: <strong>{props.description}</strong>
        </div>
      </div>

      <div>
        <h3>Welcome to SharePoint Framework!</h3>
        <p>
          The SharePoint Framework (SPFx) is a extensibility model for Microsoft
          Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to
          extend Microsoft 365 with automatic Single Sign On, automatic hosting
          and industry standard tooling.
        </p>
        <h4>Learn more about SPFx development:</h4>
        <ul className={styles.links}>
          <li>
            <a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">
              SharePoint Framework Overview
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-graph"
              target="_blank"
              rel="noreferrer"
            >
              Use Microsoft Graph in your solution
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-teams"
              target="_blank"
              rel="noreferrer"
            >
              Build for Microsoft Teams using SharePoint Framework
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-viva"
              target="_blank"
              rel="noreferrer"
            >
              Build for Microsoft Viva Connections using SharePoint Framework
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-store"
              target="_blank"
              rel="noreferrer"
            >
              Publish SharePoint Framework applications to the marketplace
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-api"
              target="_blank"
              rel="noreferrer"
            >
              SharePoint Framework API reference
            </a>
          </li>
          <li>
            <a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">
              Microsoft 365 Developer Community
            </a>
          </li>
        </ul>
        <Button />
        <div>
          <h3>Disaster Summaries</h3>
          {loading && <div>Loading...</div>}
          {!loading && error && (
            <div>An error has occurred: {error.message}</div>
          )}
          {!loading && !error && (
            <ul>
              {data?.DisasterDeclarationsSummaries?.map(
                (disaster: IDisaster) => (
                  <li key={disaster.disasterNumber}>
                    <strong>{disaster.incidentType}</strong> :{" "}
                    {disaster.designatedArea} (
                    {new Date(disaster.declarationDate).toLocaleDateString()})
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default HelloWorld;
