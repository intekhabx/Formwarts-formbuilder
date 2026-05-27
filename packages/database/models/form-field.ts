import { text, uuid, varchar, boolean, pgTable, numeric, timestamp, unique, pgEnum } from "drizzle-orm/pg-core"
import { formTable } from "./form"


export const fieldTypeEnum = pgEnum("field_type_enum", ["TEXT", "NUMBER", 'EMAIL', 'YES_NO', 'PASSWORD'])


export const formFieldTable = pgTable("form_fields", {
  id: uuid("id").primaryKey().defaultRandom(),

  formId: uuid("form_id").references(()=> formTable.id),

  label: varchar("label", {length: 100}).notNull(),
  labelKey: varchar("label_key", {length: 100}).notNull(),
  
  placeholder: text("placeholder"),
  description: text("description"),

  isRequired: boolean("is_required").default(false).notNull(),

  index: numeric("index", {scale: 2}).notNull(),

  type: fieldTypeEnum("type").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(()=> new Date())
}, 
(table) => ({
  uniqueFormIdAndIndex: unique().on(table.formId, table.index)
}))
