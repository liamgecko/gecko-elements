-- Store React Flow graph (nodes + edges) for workflow builder

alter table workflows add column definition jsonb;
