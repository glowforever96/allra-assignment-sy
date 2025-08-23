import { postSignup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      console.log(data);
    },
  });
}

export default useSignup;
