import api from "@/utils/api";

const getData = async () => {
    try {
        const { data } = await api.get<{ message: string }>("/data");

        return data;
    } catch (error) {
        console.error("❌ Error @ getData: ", error);
    }
};

export default getData;
