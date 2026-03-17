import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CivicRecord } from "@/types/civic";

export function useCivicRecords() {
  const query = useQuery({
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

  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel('civic-records-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'civic_records',
      }, () => {
        queryClient.invalidateQueries({ queryKey: ["civic-records"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
}
