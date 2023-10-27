

type Props = {
  isOpen: boolean,
  handleToggle: () => void
}

export const MobileMenuButton = ({ isOpen, handleToggle }: Props) => {

  return (
    <button
      className={`
        relative z-50
        overflow-hidden 
        h-14 w-14 
        flex flex-col 
        items-center justify-center 
        rounded-full 
        transition-colors
      `}
      title={isOpen ? 'Fechar menu' : 'Abrir menu'}
      onClick={handleToggle}
    >

      <div
        className={`
          w-8 h-1 
          transition-transform  
          bg-gray-700
          ${isOpen && "rotate-45 absolute mb-0" } 
          mb-2
        `}
      />
      <div
        className={`
          w-8 h-1 
          transition-transform  
          bg-gray-700
          ${isOpen && "-rotate-45 absolute bg-white"}
        `}
      />

    </button>
  )

}