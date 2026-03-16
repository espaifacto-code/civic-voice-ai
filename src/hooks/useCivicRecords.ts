import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CivicRecord } from "@/types/civic";

export function useCivicRecords() {
  return useQuery({
    queryKey: ["civic-records"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("civic_records")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as unknown as CivicRecord[]) ?? [];
    },
  });
}
