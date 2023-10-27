"use server"

import Head from 'next/head'
import Image from 'next/image'
import HeroImage from '../public/images/pokemon-hero.jpg'

const DESCRIPTION_TEXT_META_TAG = "Bem-vindo ao Centro Pokémom, a Clínica Veterinária Especializada em Tratar Pokémons! Aqui, dedicamos todo o nosso amor e cuidado para manter seus adoráveis Pokémons felizes e saudáveis. Nossa equipe de especialistas está pronta para oferecer tratamentos e cuidados de classe mundial para essas adoráveis criaturas. Conte com o Centro Pokémom para garantir que seus Pokémons estejam sempre prontos para novas aventuras. Confie na nossa experiência e carinho para cuidar dos seus amigos peludos (ou escamosos, ou rochosos)!"

export default function Home() {

  return (
    <>
      <Head>
        <title>Centro Pokémom: Referência em cura de Pokemons</title>
        <meta name="description" content={DESCRIPTION_TEXT_META_TAG} />
        <meta name="og:description" content={DESCRIPTION_TEXT_META_TAG} />
        <meta name="telegram:description" content={DESCRIPTION_TEXT_META_TAG} />

        <meta name="keywords" content="Centro Pokémon, pokémons, cura pokémom, cuidar de pokémom" />
        <meta name="robots" content="index, follow" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='relative min-h-screen flex flex-col '>
        <Image
          src={HeroImage}
          width={1920}
          height={1200}
          className='object-cover object-no-repeat object-center flex-1'
          alt="Vário pokémons se divertindo, brincando e relaxando. Todos estão felizes."
        />
        <h2
          className="
            absolute 
            top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            text-center
            text-white
            font-bold text-full
            leading-9
            w-full px-2
          "
        >
          Cuidamos bem do seu pokémon, <br className='hidden sm:block' />
          para ele cuidar bem de você
        </h2>
      </main>
    </>
  )
}


