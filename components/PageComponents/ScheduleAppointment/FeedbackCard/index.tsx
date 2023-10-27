import { ButtonCTA } from "components/Buttons/CTA"
import Image from "next/image"
import { HTMLProps, ReactComponentElement, ReactElement, ReactNode } from "react"



export type FeedbackCardProps = {
  title: string
  icon: string
  message: string
}

type Props = FeedbackCardProps & HTMLProps<HTMLDivElement> & { handleNewAppointment: () => void }

export const FeedbackCard = ({ title, icon, message, handleNewAppointment, ...props }: Props) => {

  return (
    <section
      role="alert"
      className="
        bg-gray-100
        border-1 border-red-100
        shadow-sm
        max-w-form
        mx-auto
        flex flex-col items-center
        gap-5
        my-44 rounded-md
        px-5 pt-5 pb-9
      "
      {...props}
    >
      <h2 className="text-xl font-bold">{title}</h2>

      <Image src={icon} width={42} height={42} alt="" />

      <p className="text-gray-muted text-sm text-center">{message}</p>

      <ButtonCTA onClick={handleNewAppointment}>
        Fazer Novo Agendamento
      </ButtonCTA>

    </section>
  )
}