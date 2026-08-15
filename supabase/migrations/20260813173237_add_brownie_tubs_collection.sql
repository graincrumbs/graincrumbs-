-- Add "Brownie Tubs" as a new product collection and seed the launch flavours.
-- Each tub is 250g and contains 3 brownie pieces (see product notes).

ALTER TYPE public.product_collection ADD VALUE IF NOT EXISTS 'brownie_tubs';

COMMIT;

INSERT INTO public.products
  (slug, name, tagline, description, image_url, notes, price, premium_topping_label, premium_topping_price, status, sort_order, collection, variant)
VALUES
  ('mixed-berry-jam-tub', 'Mixed Berry Jam Brownie Tub', 'It has real dried berries.',
   'Fudgy millet brownie pieces layered with real dried mixed berries. Bright, tart and beautiful in every bite.',
   '/assets/grain-crumbs/mixed-berry-jam.png', ARRAY['250g Tub', '3 Brownie Pieces', 'Real Dried Berries'],
   339, 'Premium Chocolate Toppings', 35, 'live', 1, 'brownie_tubs', NULL),

  ('coconut-bounty-tub', 'Coconut Bounty Brownie Tub', 'It has toasty desiccated coconut.',
   'Rich chocolate brownie pieces finished with toasty desiccated coconut for a bounty-style bite.',
   '/assets/grain-crumbs/coconut-bounty.png', ARRAY['250g Tub', '3 Brownie Pieces', 'Toasted Coconut'],
   329, 'Premium Chocolate Toppings', 35, 'live', 2, 'brownie_tubs', NULL),

  ('chocolate-walnut-tub', 'Chocolate Walnut Brownie Tub', 'It is loaded with crunchy walnuts.',
   'Our signature fudgy chocolate brownie pieces, loaded with toasted crunchy walnuts.',
   '/assets/grain-crumbs/chocolate-walnut.png', ARRAY['250g Tub', '3 Brownie Pieces', 'Crunchy Walnuts'],
   349, 'Premium Chocolate Toppings', 35, 'live', 3, 'brownie_tubs', NULL),

  ('cappuccino-walnut-tub', 'Cappuccino Walnut Brownie Tub', 'Loaded with walnuts, dusted with coffee.',
   'Mocha-style brownie pieces loaded with crunchy walnuts and finished with a delicate dusting of coffee powder.',
   '/assets/grain-crumbs/cappuccino-walnut.png', ARRAY['250g Tub', '3 Brownie Pieces', 'Coffee Dusted'],
   359, 'Premium Chocolate Toppings', 35, 'live', 4, 'brownie_tubs', NULL),

  ('hazelnut-filling-tub', 'Hazelnut Filling Brownie Tub', 'It is loaded with crunchy golden hazelnuts.',
   'Fudgy brownie pieces loaded with crunchy golden hazelnuts and a generous hazelnut filling.',
   '/assets/grain-crumbs/hazelnut-spread.png', ARRAY['250g Tub', '3 Brownie Pieces', 'Golden Hazelnuts'],
   389, 'Premium Chocolate Toppings', 35, 'live', 5, 'brownie_tubs', NULL),

  ('cream-cheese-tub', 'Cream Cheese Brownie Tub', 'It is loaded with cream cheese.',
   'Rich chocolate brownie pieces finished with swirls of smooth, tangy cream cheese.',
   '/assets/grain-crumbs/cream-cheese.png', ARRAY['250g Tub', '3 Brownie Pieces', 'Cream Cheese'],
   389, 'Premium Chocolate Toppings', 35, 'live', 6, 'brownie_tubs', NULL)
ON CONFLICT (slug) DO NOTHING;
