"use client";
import React, {useEffect, useState } from "react";
import "../styles/styles.css";
import Slider from "./Slider";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios from "axios";

interface ApiResponse{
    0: {
      word: string,
      phonetic: string,
      phonetics: phonetic[],
      meanings: meaning[],
      sourceUrls: string[],
    }

}

interface meaning {
  partOfSpeech: string,
  definitions: definition[],
  synonyms: string[],
}

interface definition {
  definition: string,
}

interface phonetic{
  audio: string,
}



const searchSchema = z.object({
  search: z
    .string({ message: "Whoops, can't be empty" })
    .min(1, { message: "Whoops, can't be empty" }),
});

type search = z.infer<typeof searchSchema>;

const Card = () => {
  const [word, setWord] = useState<ApiResponse | null>(null);
  const [query, setQuery] = useState<string>("dictionary");
  const [error, setError] = useState('');
  const [verbDefinition, setVerbDefintion] = useState('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;


  const playSound = () => {
    if(audio){
    audio.play();
    }
  }

  useEffect(() => {
    if (!query) return; // Skip if no query

    const getWord = async () => {
      try {
        const res = await axios.get(URL);
        setWord(res.data);
        setError("");

        const definitions = res.data[0]?.meanings[1]?.definitions;
        setVerbDefintion(definitions ? definitions[0].definition : "No definition available");

        // Set the new audio
        const audioUrl = res.data[0]?.phonetics?.find((p: { audio: string; }) => p.audio)?.audio;
        if (audioUrl) {
          setAudio(new Audio(audioUrl));
        }
      } catch (err) {
        setError("Word not in dictionary");
      }
    };

    getWord();
  }, [query]);

  const onSubmit: SubmitHandler<search> = (data) => {
    setQuery(data.search);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<search>({ resolver: zodResolver(searchSchema) });
  const [isLight, setLight] = useState(true);

  const toggleLight = () => {
    setLight(!isLight);
  };
  
  return (
  
    <div className={`${isLight ? "light" : "dark"} big`}>
      <div className="container">
        <div className="top">
          <img src="/images/logo.svg" alt="logo" />

          <button onClick={toggleLight}>
            <div className="flex flex-row items-center gap-5">
              <Slider isLight={isLight} />
              <img className="moon" src="/images/icon-moon.svg" alt="" />
            </div>
          </button>
        </div>

        <form
          className="flex flex-col my-3 sm:my-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={`${errors.search ? "ring-error ring-1" : ""} searchBox`}
          >
            <input
              placeholder="Search for any word..."
              className="searchInput"
              type="text"
              id="search"
              {...register("search")}
            />
            <button className="search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  fill="none"
                  stroke="#A445ED"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
                />
              </svg>
            </button>
          </div>
          {errors.search ? (
            <p className="text-error">{errors.search.message}</p>
          ) : (
            ""
          )}
          
          {error !== '' ? <p className="text-error">Word not in dictionary</p>: <p></p>}
        </form>
        <section className="flex flex-row justify-between my-3 items-center">
          <div>
            <h1 className="headerWord">{word?.[0].word}</h1>
            <p className="pronounce">{word?.[0].phonetic}</p>
          </div>
          <button className="play" onClick={playSound}>
            <svg
              className="play"
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 75 75"
            >
              <g fill="#A445ED" fillRule="evenodd">
                <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                <path d="M29 27v21l21-10.5z" />
              </g>
            </svg>
          </button>
        </section>

        <section>
          <div className="lineSection">
            <p className="font-medium">{word?.[0].meanings[0].partOfSpeech}</p>
            <hr className="line" />
          </div>

          <p className="text-lighterFont ">Meaning</p>

          <ul className="nounList">
            {word?.[0].meanings[0].definitions.slice(0,3).map((definition, index)=> (
              <div className="listGroup" key={index}>
              <div className="dot"></div>
              {definition.definition}
            </div>
            ))}
          </ul>

          <div className="sectionFooter">
            <p className="text-lighterFont">Synonyms</p>
            <p className="text-purple font-semibold">{word?.[0].meanings[0].synonyms[0]}</p>
          </div>
        </section>
        <section>
          <div className="lineSection">
            <p className="font-medium">verb</p>
            <hr className="line" />
          </div>
          <p className="text-lighterFont">Meaning</p>
            <ul className="nounList">
              <div className="listGroup">
                <div className="dot"></div>
                {verbDefinition}
              </div>
            </ul>

          <p className="sentence">
            {`I like the word ${query}`}
          </p>
        </section>

        <hr />

        <div className="footer">
          <p className="underline text-lighterFont">Source</p>
          <div className="flex flex-row gap-3 items-center">
            <Link
              className="underline"
              href={`${word?.[0].sourceUrls}`}
            >
              {word?.[0].sourceUrls}
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <path
                fill="none"
                stroke="#838383"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
