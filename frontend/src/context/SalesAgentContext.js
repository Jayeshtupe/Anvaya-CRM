import { createContext, useContext, useState, useEffect, Children } from "react";
import axios from "axios";

const agentContext = createContext()
export const useAgents = () => useContext(agentContext)

export const AgentProvider = ({children}) => {

     const url = "https://anvaya-crm-lyart.vercel.app"

     const [ agents, setAgents ] = useState([])
     const [ loading, setLoading ] = useState(false)
     const [ error, setError ] = useState(null)
     const [ message, setMessage ] = useState("")

     useEffect(() => {
        const timeout = setTimeout(() => {
            setError("")
            setMessage("")
        }, 3000)
        return () => clearTimeout(timeout)
     }, [message, error])

     useEffect(() => {
        getAgents()
     }, [])

     const getAgents = async() => {
        setLoading(true)
        try {
            const agent = await axios.get(`${url}/agents`)
            setAgents(agent.data)
        } catch(error){
            setError(error.message)
        } finally {
            setLoading(false)
        }
     }

     const addAgent = async (data) => {
        setLoading(true)
        try {
            const agent = await axios.post(`${url}/agents`, data)
            setMessage("Sales agent Added")
            getAgents()
        } catch(error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
     }

     const deleteAgent = async(id) => {
        setLoading(true)
        try {
            const agent = await axios.delete(`${url}/agents/${id}`)
            setMessage("Sales agent deleted")
            getAgents()
        } catch(error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
     }

    return (
        <agentContext.Provider value={{ loading, error, message, agents, getAgents, addAgent, deleteAgent }}>
            {children}
        </agentContext.Provider>
    )
}