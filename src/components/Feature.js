import React, { Fragment, useState, useEffect } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = ({
  searchTerm,
  searchValue,
  setIsLoading,
  setSearchResults,
}) => {
  return (
    <Fragment>
      <span className="title">{`${searchTerm}`}</span>
      <span className="content">
        <a
          href="#"
          onClick={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            try {
              const results = await fetchQueryResultsFromTermAndValue(
                searchTerm,
                searchValue
              );
              setSearchResults(results);
            } catch (error) {
              console.log("ERROR");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {`${searchValue}`}
        </a>
      </span>
    </Fragment>
  );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = (props) => {
  const { featuredResult, setIsLoading, setSearchResults } = props;

  return !featuredResult ? (
    <main id="feature"></main>
  ) : (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{`${featuredResult.title}`}</h3>
          <h4>{`${featuredResult.dated}`}</h4>
        </header>
        <section className="facts">
          {featuredResult.description ? (
            <Fragment>
              <span className="title">description</span>
              <span className="content">{`${featuredResult.description}`}</span>
            </Fragment>
          ) : null}

          {featuredResult.culture ? (
            <Searchable
              searchTerm="Culture"
              searchValue={featuredResult.culture}
              setIsLoading={setIsLoading}
              setSearchResults={setSearchResults}
            />
          ) : null}

          {featuredResult.style ? (
            <Fragment>
              <span className="title">Style</span>
              <span className="content">{`${featuredResult.style}`}</span>
            </Fragment>
          ) : null}

          {featuredResult.technique ? (
            <Searchable
              searchTerm="Technique"
              searchValue={featuredResult.technique}
              setIsLoading={setIsLoading}
              setSearchResults={setSearchResults}
            />
          ) : null}

          {featuredResult.medium ? (
            <Searchable
              searchTerm="Medium"
              searchValue={featuredResult.medium}
              setIsLoading={setIsLoading}
              setSearchResults={setSearchResults}
            />
          ) : null}

          {featuredResult.dimensions ? (
            <Fragment>
              <span className="title">Dimensions</span>
              <span className="content">{`${featuredResult.dimensions}`}</span>
            </Fragment>
          ) : null}

          {featuredResult.people ? <span className="title">People</span> : null}
          {featuredResult.people
            ? featuredResult.people.map((person, i) => {
                return (
                  <div key={i} className="content">{`${person.alphasort} (${
                    person.displaydate ? person.displaydate : "unknown"
                  })`}</div>
                );
              })
            : null}

          {featuredResult.department ? (
            <Fragment>
              <span className="title">Department</span>
              <span className="content">{`${featuredResult.department}`}</span>
            </Fragment>
          ) : null}

          {featuredResult.division ? (
            <Fragment>
              <span className="title">Division</span>
              <span className="content">{`${featuredResult.division}`}</span>
            </Fragment>
          ) : null}

          {featuredResult.contact ? (
            <Fragment>
              <span className="title">Contact</span>
              <span className="content">{`${featuredResult.contact}`}</span>
            </Fragment>
          ) : null}

          {featuredResult.creditline ? (
            <Fragment>
              <span className="title">Credit line</span>
              <span className="content">{`${featuredResult.creditline}`}</span>
            </Fragment>
          ) : null}
        </section>

        <section className="photos">
          {featuredResult.images && featuredResult.images.length > 0 ? (
            featuredResult.images.map((props, index) => {
              return (
                <img
                  key={index}
                  src={props.baseimageurl}
                  alt={props.title}
                ></img>
              );
            })
          ) : (
            <h1>Nothing to display</h1>
          )}
        </section>
      </div>
    </main>
  );
};

export default Feature;
