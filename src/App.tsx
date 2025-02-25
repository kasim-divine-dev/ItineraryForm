import ItineraryForm from './components/ItineraryForm'

const App = () => {

  const onSubmit = (data: any) => {
    console.log('itinerary data', data)
  }

  return (
    <ItineraryForm
      apiKey='1234'
      onDataReceived={onSubmit}
      formDetails={{ destination: 'Tokyo', startDate: '2023-01-01', endDate: '2023-01-05', persons: 2 }}
      key={'1234'}
    />
  )
}

export default App