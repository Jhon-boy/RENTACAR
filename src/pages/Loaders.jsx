import { Waveform } from '@uiball/loaders'
export const Loader = () => {
    return (
      <div className='container-loader'>
        <Waveform
        size={60}
        lineWeight={3.5}
        speed={1}
        color="black"
      />
      </div>
    )
  }
  