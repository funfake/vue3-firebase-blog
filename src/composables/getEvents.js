import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
const getEvents = () => {
  const events = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      projectFirestore
      .collection("event")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        events.value = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { events, error, load };
};

export default getEvents;
