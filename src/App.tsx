import ItineraryForm, { FormValues } from './components/ItineraryForm'

const App = () => {

  const onSubmit = (data: FormValues) => {
    console.log('itinerary data', data)
  }

  return (
    <ItineraryForm onSubmit={onSubmit} />
  )
}

export default App